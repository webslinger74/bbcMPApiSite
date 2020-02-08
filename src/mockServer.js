import { createServer } from 'http';
import mockserver from 'mockserver';
 
createServer(mockserver('path/to/your/mocks')).listen(9001);

