import { HttpHandler, HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';

import { tokenInterceptor } from './token-interceptor';

describe('tokenInterceptor', () => {
  let interceptor: tokenInterceptor;

  beforeEach(() => {
    interceptor = new tokenInterceptor();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should attach the Authorization header when a token exists', () => {
    localStorage.setItem('token', 'abc123');
    const req = new HttpRequest('GET', '/test');
    const next: HttpHandler = {
      handle: (request) => {
        expect(request.headers.get('Authorization')).toBe('Bearer abc123');
        return of();
      },
    };
    interceptor.intercept(req, next);
  });
});
