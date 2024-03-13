export enum ResponseEnum {
  SUCCESS = 'Success',
  UNAUTHORIZED = 'Unauthorized',
  INVALID_CREDENTIAL = 'Invalid Credential',
  BAD_REQUEST = 'Bad Request',
  SERVER_ERROR = 'Internal Server Error',
  FORBIDDEN = 'Forbidden',
  SESSION_EXPIRED = 'Session Expired',
  CONFLICT = 'Conflict',
}

export enum RoleEnum {
  ADMIN = 'Admin',
  STUDENT = 'Student',
  TEACHER = 'Teacher',
  PARENT = 'Parent',
  SUPER = 'Super',
}
