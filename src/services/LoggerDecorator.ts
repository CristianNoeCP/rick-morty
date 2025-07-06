import { DomainError, TypeErrors } from "../types/DomainError";


export class LoggerDecorator {
	static decorate<T>(decorated: T): T {
		// @ts-ignore
		return new Proxy(decorated, {
			get: (target, propKey, _) => {
				// @ts-ignore
				const originalMethod = target[propKey];
				if (typeof originalMethod === "function") {
					return async (...args: any[]) => {
						try {
              console.info(`Calling method: ${String(propKey)} with arguments:${JSON.stringify(args)}, timestamp:${Date.now()}` );
							const result = await originalMethod.apply(target, args);
							return result;
						} catch (error: any) {
              console.error(`Error in method: ${String(propKey)} with arguments:${JSON.stringify(args)}, timestamp:${Date.now()}, error: ${JSON.stringify(error)}`);
							throw new DomainError("Internal server error", TypeErrors.InternalServerError );
						}
					};
				}

				return originalMethod;
			},
		});
	}
}