export type ErrorLog = {
  statusCode: number;
  message: string;
  error: string;
};

export function createErrorTemplate(err: ErrorLog, path: string) {
  const template = `
========================================
Error LOG:${new Date().toISOString()}
========================================
path:${path}  
status:${err.statusCode}  
message:${err.message}
error:${err.error}
========================================
`;
  return template;
}
