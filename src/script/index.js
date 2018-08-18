/**
 * index.js
 */
import '../style/index.css';
import '../style/common.css';
import '../style/dialog.css';

import { sleep , showmsg , str } from './common/utils.js';

async function page(){
	await sleep(5000);
	showmsg('index.js-showmsg66666');
	showmsg(str);
}

page()