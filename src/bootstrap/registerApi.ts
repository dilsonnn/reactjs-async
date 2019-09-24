declare global {
    interface Window {
		bundleRegister: any;
		domApi: any;
		widgetRegister: any;
    }
}


export default function(){
	return {
	 bundleRegister: window.bundleRegister,
	 widgetRegister: window.widgetRegister,
	 domApi: window.domApi
	};
};