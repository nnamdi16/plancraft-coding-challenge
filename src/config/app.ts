const server = {
    serviceName: {
      doc: "Microservice Name",
      format: "*",
      default: "IdentityService",
      env: 'SERVICE_AUTH_NAME',
      sensitive: false,
    },
    port: {
      doc: "The port to bind",
      format: "port",
      default: 30200,
      env: 'SERVICE_AUTH_PORT',
      sensitive: false,
    },
    version: {
      doc: "The API version",
      format: "*",
      default: "v1",
      env: 'API_VERSION',
      sensitive: false,
    },
    env: {
      doc: "The application environment",
      format: ["production", "development", "test", "qa", "staging"],
      default: "development",
      env: 'NODE_ENV',
      sensitive: false,
    },
    bodyLimit: {
      doc: "The maximum size of request bodies (json)",
      format: "*",
      default: "10mb",
      env: "BODY_LIMIT",
      sensitive: false,
    },
    allowedOrigins: {
      doc: "Allowed origins for CORS",
      format: "*",
      default: "*",
      env: "ALLOWED_ORIGINS",
      sensitive: false,
    },
    jwtIssuer: {
      doc: "JWT Issuer",
      format: "*",
      default: "http://letscollabo.live/",
      env: "JWT_ISSUER",
      sensitive: false,
    },
    jwtAudience: {
      doc: "JWT Audience",
      format: "*",
      default: "http://letscollabo.live/",
      env: "JWT_AUDIENCE",
      sensitive: false,
    },
    jwtSecret: {
    doc: "JWT Secret",
    format: "*",
    default: "",
    env: "JWT_SECRET",
    sensitive: true,
  },
    frontendBasUrl: {
      doc: "Frontend base url",
      format: "*",
      default: "http://letscollabo.live/",
      env: "FRONTEND_BASE_URL",
      sensitive: false,
    },
    elasticsearchUrl: {
      doc: "Frontend base url",
      format: "*",
      default: "http://letscollabo.live/",
      env: "ELASTICSEARCH_URL",
      sensitive: false,
    },
    sgAPIKey: {
      doc: "Send API Key",
      format: "*",
      default: "",
      env: encodeURIComponent("SENDGRID_API_KEY"),
      sensitive: true,
    },
    encryptionKey: {
      doc: "Encryption Key",
      format: "*",
      default: "",
      env: encodeURIComponent("ENCRYPTION_KEY"),
      sensitive: true,
    },
  };
  
  export default server;
  