import { Component } from 'react';

class Email extends Component {
	//-- LIBRARY FROM https://smtpjs.com/ --//
	/* SmtpJS.com - v2.0.1 */
	send = (e, o, t, n, a, s, r, c) => {
		let d = Math.floor(1e6 * Math.random() + 1);
		let i = `From=${e}&to=${o}&Subject=${encodeURIComponent(
			t
		)}&Body=${encodeURIComponent(n)}`;

		if (!a.token) {
			i += `&Host=${a}&Username=${s}&Password=${r}&Action=Send`;
		} else {
			i += `&SecureToken=${a.token}&Action=SendFromStored`;
			c = a.callback;
		}
		i += '&cachebuster=' + d;

		this.ajaxPost('https://smtpjs.com/v2/smtp.aspx?', i, c);
	};
	sendWithAttachment = (e, o, t, n, a, s, r, c, d) => {
		let i = Math.floor(1e6 * Math.random() + 1);
		let m = `From=${e}&to=${o}&Subject=${encodeURIComponent(
			t
		)}&Body=${encodeURIComponent(n)}&Attachment=${encodeURIComponent(c)}`;

		if (!a.token) {
			m += `&Host=${a}&Username=${s}&Password=${r}&Action=Send`;
		} else {
			m += `&SecureToken=${a.token}&Action=SendFromStored`;
		}

		m += `&cachebuster=${i}`;

		this.ajaxPost('https://smtpjs.com/v2/smtp.aspx?', m, d);
	};
	ajaxPost = (e, o, t) => {
		let n = this.createCORSRequest('POST', e);
		n.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		n.onload = () => {
			let e = n.responseText;
			if (t) t(e);
		};
		n.send(o);
	};
	ajax = (e, o) => {
		let t = this.createCORSRequest('GET', e);
		t.onload = () => {
			let e = t.responseText;
			if (o) o(e);
		};
		t.send();
	};
	createCORSRequest = (e, o) => {
		let t = new XMLHttpRequest();
		return (
			'withCredentials' in t
				? t.open(e, o, !0)
				: 'undefined' !== typeof XDomainRequest
					? (t = new XDomainRequest()).open(e, o)
					: (t = null),
			t
		);
	};
}

export default Email;
