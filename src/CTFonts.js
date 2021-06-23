
class CTFonts{}

CTFonts.getNative = async (force_recheck = false) => {
	
	if(CTFonts._native_available.length && !force_recheck){
		return CTFonts._native_available;
	}

	var _native_available = [];
	await document.fonts.ready;
	CTFonts._native_fontlist.forEach(font => {
		if (document.fonts.check(`12px "${font}"`)) {
			_native_available.push(font);
		}
	})

	CTFonts._native_available = [...new Set(_native_available)].sort();
	return CTFonts._native_available;
};

CTFonts.getDownloaded = async (force_recheck = false) => {
	if(CTFonts._downloaded_available.length && !force_recheck){
		return CTFonts._downloaded_available;
	}
	
	let {fonts} = document;
	const it = fonts.entries();

	let arr = [];
	let done = false;

	while (!done) {
		const font = it.next();
		if (!font.done) {
			
			var family;
			try{
				family = JSON.parse(font.value[0].family);
			}catch(e){
				family = font.value[0].family;
			}
			
			arr.push(family);
		} else {
			done = font.done;
		}
	}
	
	CTFonts._downloaded_available = [...new Set(arr)].sort();
	return CTFonts._downloaded_available;
};

CTFonts.getAvailable = async () => {
	var native = await CTFonts.getNative();
	var downloaded = await CTFonts.getDownloaded();
	return [...new Set([...native, ...downloaded])].sort();
};

CTFonts._native_available = [];
CTFonts._downloaded_available = [];