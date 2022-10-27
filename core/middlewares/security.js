import helmet from 'helmet';
import cors from 'cors'
import { expressjwt } from 'express-jwt'

import { convertTimeDouble } from '../../utils/time.js';

export const security_MWs = [ 
	helmet(), 
	cors() 
	expressjwt({
		  secret: "shhhhhhared-secret",
		  algorithms: ["HS256"],
		})
	];