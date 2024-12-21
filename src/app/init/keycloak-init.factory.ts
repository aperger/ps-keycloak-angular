import { KeycloakService } from "keycloak-angular";
import { KeycloakConfig } from "keycloak-js";
import { environment } from "src/environments/environment";


export function initializeKeycloak (keycloak: KeycloakService): () => Promise<boolean> {
    const keyclaokConfig: KeycloakConfig = {
      url: environment.KEYCLOAK_URL,
      realm: environment.KEYCLOAK_REALM,
      clientId: environment.KEYCLOAK_CLIENT_ID,
    }
    var response = () => keycloak.init({
      config: keyclaokConfig,
      /*
      initOptions: {
        flow: "implicit",
        adapter: "default",
      }
      */
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
      enableBearerInterceptor: true,
      loadUserProfileAtStartUp: false,
      bearerExcludedUrls: ['assets/']
    });   
    return response;
}
