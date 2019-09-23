declare global {
    interface Window {
		bundleRegister: any;
		domApi: any;
		widgetRegister: any;
    }
}

window.bundleRegister = window.bundleRegister || {};
window.widgetRegister = window.widgetRegister || {};
window.domApi = window.domApi || {};


export default function(){
	return {
	 bundleRegister: window.bundleRegister,
	 widgetRegister: window.widgetRegister,
	 domApi: window.domApi
	};
};