import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { ExcludedUrlRegex } from 'keycloak-angular/lib/core/interfaces/keycloak-options';
import { Observable, ObservableInput, switchMap } from 'rxjs';

@Injectable()
export class KeycloakTokenInterceptor implements HttpInterceptor {
	constructor(private kcService: KeycloakService, private tokenExtractor: HttpXsrfTokenExtractor) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const token = this.tokenExtractor.getToken() as string;

		const shallPass = request.url.startsWith('assets/'); // this.kcService.excludedUrls.findIndex((item => this.isUrlExcluded(request, item))) > -1;
        if (!token && shallPass) {
            return next.handle(request);
        }

		
		console.log(this.kcService.excludedUrls);
		return this.kcService.addTokenToHeader(request.headers).pipe(switchMap<HttpHeaders, ObservableInput<HttpEvent<any>>>((headersWithBearer) => {
			request = request.clone({ headers: headersWithBearer })
			return next.handle(request);
		}));
		// return this.keycloak.addTokenToHeader(req.headers).pipe(mergeMap((headersWithBearer => {
        //     const kcReq = req.clone({ headers: headersWithBearer });
        //     return next.handle(kcReq);
        // })));
	}
	isUrlExcluded(request: HttpRequest<any>, item: ExcludedUrlRegex): boolean {
		return request.url.includes(item.urlPattern.source);
	}
}
