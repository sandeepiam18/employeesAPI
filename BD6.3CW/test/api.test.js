const request = require('supertest');
const {
  app,
  getAllReviews,
  getReviewById,
  addReview,
  getUserById,
  addUser,
} = require('../index.js');
const http = require('http');
const { before, describe, afterEach } = require('node:test');
jest.mock('../index.js', () => ({
  ...jest.requireActual('../index.js'),
  getAllReviews: jest.fn(),
  getReviewById: jest.fn(),
  addReview: jest.fn(),
  getUserById: jest.fn(),
  addUser: jest.fn(),
}));
let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});
afterAll((done) => {
  server.close(done);
});
describe('API endpoints', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should retrive all reviews', async () => {
    const mockReviews = [
      { id: 1, content: 'Great product!', userId: 1 },
      { id: 2, content: 'Not bad, could be better.', userId: 2 },
    ];
    getAllReviews.mockResolvedValue(reviews);
    const result = await request(server).get('/reviews');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockReviews);
  });

  it('should add an new review', async () => {
    const mockReview = { id: 3, content: 'Awesome!', userId: 1 };
    addReview.mockResolvedValue(mockReview);
    const res = await request(server)
      .post('/reviews/new')
      .send({ content: 'Awesome!', userId: 1 });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(mockReview);
  });

  it('should retrieve a specific user by id', async () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
    getUserById.mockResolvedValue(mockUser);
    const res = await request(server).get('/users/details/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockUser);
  });
  it('should add a new user', async () => {
    const mockUser = {
      id: 3,
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
    };
    addUser.mockResolvedValue(mockUser);
    const res = await request(server)
      .post('/Users/new')
      .send({ name: 'Alice Brown', email: 'alice.brown@example.com' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(mockUser);
  });
  it('should return 404 for non-existing review', async () => {
    getReviewById.mockResolvedValue(null);
    const res = await request(server).get('/reviews/details/999');
    expect(res.statusCode).toEqual(404);
  });
  it('should return 404 for non-existing user', async () => {
    getUserById.mockResolvedValue(null);
    const res = await request(server).get('/users/details/888');
    expect(res.statusCode).toEqual(404);
  });
});
