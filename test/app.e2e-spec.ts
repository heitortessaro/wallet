import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
// pactum is a request making library, so it need a server/api to make these requests
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';
import { EditUserDto } from '../src/user/dto';
import { CreateStokeOperation } from 'src/stoke-operations/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  // Build a module for the test
  // uses the AppModule for it
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    //  we need to create a replica of the server with the same
    // pipes and validation since it is an e2e test
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(3333);

    // defines primsa as the prisma service based on the module
    prisma = app.get(PrismaService);
    // clean the db before tests
    await prisma.cleandb();

    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'test@test.com',
      password: 'StrongPassword123',
      firstName: 'testName',
      lastName: 'LastName',
    };

    describe('Signup', () => {
      it('should throw if  email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
            firstName: dto.firstName,
            lastName: dto.lastName,
          })
          .expectStatus(400);
      });
      it('should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
            firstName: dto.firstName,
            lastName: dto.lastName,
          })
          .expectStatus(400);
      });

      it('should throw if no body is provided', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('should throw if no body is provided', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
      it('Should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
            email: dto.email,
          })
          .expectStatus(200)
          .stores('userAthorizationToken', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should not get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer no token',
          })
          .expectStatus(401);
      });
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAthorizationToken}',
          })
          .expectStatus(200);
      });
    });
    describe('Edit user', () => {
      it('should edit the current user', () => {
        const dto: EditUserDto = {
          email: 'new-test@testmail.com',
          firstName: 'testName',
        };

        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAthorizationToken}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });
  });

  describe('Stoke Operations', () => {
    describe('Get empty stokeOperations', () => {
      it('should get empty stokeOperations', () => {
        return pactum
          .spec()
          .get('/stoke-operations')
          .withHeaders({
            Authorization: 'Bearer $S{userAthorizationToken}',
          })
          .expectStatus(HttpStatus.OK)
          .expectBody([]);
      });
    });
    describe('create stoke operation', () => {
      const dto: CreateStokeOperation = {
        stockCode: 'abcd3',
        quantity: 100,
        unitValue: 15.15,
        operationType: 'BUY',
        operationDate: new Date(2023, 4, 29),
      };
      console.log(dto.operationDate);
      it('should create  stoke operation', () => {
        return pactum
          .spec()
          .post('/stoke-operations')
          .withHeaders({
            Authorization: 'Bearer $S{userAthorizationToken}',
          })
          .withBody(dto)
          .expectStatus(HttpStatus.CREATED)
          .expectBodyContains(dto.stockCode)
          .expectBodyContains(dto.quantity)
          .expectBodyContains(dto.unitValue)
          .expectBodyContains(dto.operationType)
          .expectBodyContains(dto.operationDate)
          .stores('stokeOperationId', 'id');
      });
    });
  });
});
