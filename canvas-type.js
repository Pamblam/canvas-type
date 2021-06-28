/**
 * canvas-type - v0.0.1
 * An attempt to replicate the text input box from GIMP on an HTML5 canvas.
 * @author Rob Parham
 * @website https://pamblam.github.io/canvas-type/
 * @license MIT
 */

const CanvasType = (()=>{

class CanvasType{
	
	constructor(canvas, opt){
		this.active = false;
		this.text = '';
		this.canvas = canvas;
		
		this.typeArea = {};
		this.typeArea.width = opt.typeArea.width || canvas.width;
		this.typeArea.height = opt.typeArea.height || canvas.height;
		this.typeArea.x = opt.typeArea.x || 0;
		this.typeArea.y = opt.typeArea.y || 0;
		
		this._keydownHandler = this.keydownHandler.bind(this);
		this.attachEventHandlers();
	}
	
	setTypeArea(x, y, w, h){
		this.typeArea.width = w;
		this.typeArea.height = h;
		this.typeArea.x = x;
		this.typeArea.y = y;
	}
	
	keydownHandler(){
		
	}
	
	attachEventHandlers(){
		this.canvas.addEventListener(this._keydownHandler);
	}
	
	removeEventHandlers(){
		this.canvas.removeEventListener(this._keydownHandler);
	}
	
}

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
CTFonts._native_fontlist = [
	'Arial',
	'Arial Unicode MS',
	'Bitstream Cyberbit',
	'BitstreamCyberCJK',
	'Brampton',
	'Cardo',
	'Caslon Roman',
	'Charis SIL',
	'Chrysanthi Unicode',
	'Chryſanþi Unicode',
	'ClearlyU',
	'Code2000',
	'DejaVu Sans',
	'Doulos SIL',
	'Everson Mono',
	'Gentium Regular',
	'Gentium Plus',
	'GNU FreeFont',
	'Unifont',
	'GNU Unifont',
	'HAN NOM A',
	'HAN NOM B',
	'Horta',
	'Junicode',
	'Kelvinch',
	'Linux Libertine',
	'Lucida Grande',
	'Lucida Sans Unicode',
	'Microsoft JhengHei',
	'Microsoft Sans Serif',
	'New Gulim',
	'Noto',
	'PragmataPro',
	'Quivira',
	'Segoe UI Regular',
	'Squarish Sans CT',
	'STIX',
	'Sun-ExtA',
	'Sun-ExtB',
	'Tahoma',
	'Times New Roman',
	'TITUS Cyberbit Basic',
	'WenQuanYi Bitmap Song',
	'WenQuanYi Micro Hei',
	'WenQuanYi Zen Hei',
	'Y.OzFontN',
	'XITS',
	'Aharoni',
	'Aldhabi',
	'Andalus',
	'Angsana New',
	'AngsanaUPC',
	'Aparajita',
	'Arabic Typesetting',
	'Bahnschrift',
	'Batang',
	'BatangChe',
	'BIZ UDGothic',
	'BIZ UDPGothic',
	'BIZ UDMincho',
	'BIZ UDPMincho',
	'Book Antiqua',
	'Browallia New',
	'BrowalliaUPC',
	'Calibri',
	'Calisto MT',
	'Cambria',
	'Cambria Math',
	'Candara',
	'Century Gothic',
	'Comic Sans MS',
	'Consolas',
	'Constantia',
	'Copperplate Gothic',
	'Corbel',
	'Cordia New',
	'CordiaUPC',
	'Courier New',
	'DaunPenh',
	'David',
	'DengXian',
	'DilleniaUPC',
	'DFKai-SB',
	'DokChampa',
	'Dotum',
	'DotumChe',
	'Ebrima',
	'Estrangelo Edessa',
	'EucrosiaUPC',
	'Euphemia',
	'FangSong',
	'Franklin Gothic',
	'FrankRuehl',
	'FreesiaUPC',
	'Gabriola',
	'Gadugi',
	'Gautami',
	'Georgia',
	'Gisha',
	'Gulim',
	'GulimChe',
	'Gungsuh',
	'GungsuhChe',
	'HoloLens MDL2 Assets',
	'Impact',
	'Ink Free',
	'IrisUPC',
	'Iskoola Pota',
	'JasmineUPC',
	'Javanese Text',
	'SimKai',
	'KaiTi',
	'Kalinga',
	'Kartika',
	'Khmer UI',
	'KodchiangUPC',
	'Kokila',
	'Lao UI',
	'Latha',
	'Leelawadee',
	'Leelawadee UI',
	'Levenim MT',
	'LilyUPC',
	'Lucida Console',
	'Lucida Handwriting',
	'Malgun Gothic',
	'Mangal',
	'Marlett',
	'Meiryo',
	'Meiryo UI',
	'Microsoft Himalaya',
	'Microsoft JhengHei UI',
	'Microsoft New Tai Lue',
	'Microsoft PhagsPa',
	'Microsoft Tai Le',
	'Microsoft Uighur',
	'Microsoft YaHei',
	'Microsoft YaHei UI',
	'Microsoft Yi Baiti',
	'MingLiU',
	'PMingLiU',
	'MingLiU-ExtB',
	'PMingLiU-ExtB',
	'MingLiU_HKSCS',
	'MingLiU_HKSCS-ExtB',
	'Miriam',
	'Miriam Fixed',
	'Mongolian Baiti',
	'MoolBoran',
	'MS Gothic',
	'MS PGothic',
	'MS Mincho',
	'MS PMincho',
	'MS UI Gothic',
	'MV Boli',
	'Myanmar Text',
	'Narkisim',
	'Nirmala UI',
	'NSimSun',
	'Nyala',
	'Palatino Linotype',
	'Plantagenet Cherokee',
	'Raavi',
	'Rod',
	'Sakkal Majalla',
	'Sanskrit Text',
	'Segoe MDL2 Assets',
	'Segoe Print',
	'Segoe Script',
	'Segoe SD',
	'Segoe UI',
	'Segoe UI Emoji',
	'Segoe UI Historic',
	'Segoe UI Symbol',
	'Shonar Bangla',
	'Shruti',
	'SimHei',
	'Simplified Arabic',
	'SimSun',
	'SimSun-ExtB',
	'Sitka Banner',
	'Sitka Display',
	'Sitka Heading',
	'Sitka Small',
	'Sitka Subheading',
	'Sitka Text',
	'Sylfaen',
	'Symbol',
	'Traditional Arabic',
	'Trebuchet MS',
	'Tunga',
	'UD Digi Kyokasho',
	'Urdu Typesetting',
	'Utsaah',
	'Vani',
	'Verdana',
	'Vijaya',
	'Vrinda',
	'Webdings',
	'Wingdings',
	'Yu Gothic',
	'Yu Gothic UI',
	'Yu Mincho',
	'Al Bayan',
	'American Typewriter',
	'Andalé Mono',
	'Apple Casual',
	'Apple Chancery',
	'Apple Garamond',
	'Apple Gothic',
	'Apple LiGothic',
	'Apple LiSung',
	'Apple Myungjo',
	'Apple Symbols',
	'.AquaKana',
	'Arial Hebrew',
	'Ayuthaya',
	'Baghdad',
	'Baskerville',
	'Beijing',
	'BiauKai',
	'Big Caslon',
	'Brush Script',
	'Chalkboard',
	'Chalkduster',
	'Charcoal',
	'Charcoal CY',
	'Chicago',
	'Cochin',
	'Comic Sans',
	'Cooper',
	'Copperplate',
	'Corsiva Hebrew',
	'Courier',
	'DecoType Naskh',
	'Devanagari',
	'Didot',
	'Euphemia UCAS',
	'Futura',
	'Gadget',
	'Geeza Pro',
	'Geezah',
	'Geneva',
	'Geneva CY',
	'Gill Sans',
	'Gujarati',
	'Gung Seoche',
	'Gurmukhi',
	'Hangangche',
	'HeadlineA',
	'Hei',
	'Helvetica',
	'Helvetica CY',
	'Helvetica Neue',
	'Herculanum',
	'Hiragino Kaku Gothic Pro',
	'Hiragino Kaku Gothic ProN',
	'Hiragino Kaku Gothic Std',
	'Hiragino Kaku Gothic StdN',
	'Hiragino Maru Gothic Pro',
	'Hiragino Maru Gothic ProN',
	'Hiragino Mincho Pro',
	'Hiragino Mincho ProN',
	'Hoefler Text',
	'Inai Mathi',
	'Jung Gothic',
	'Kai',
	'Keyboard',
	'Krungthep',
	'KufiStandard GK',
	'Kuenstler Script',
	'LastResort',
	'LiHei Pro',
	'LiSong Pro',
	'Lucida Sans',
	'Marker Felt',
	'Menlo',
	'Monaco',
	'Monaco CY',
	'Mshtakan',
	'Nadeem',
	'New Peninim',
	'New York',
	'NISC GB18030',
	'Optima',
	'Osaka',
	'Palatino',
	'Papyrus',
	'PC Myungjo',
	'Pilgiche',
	'Raanana',
	'Sand',
	'Sathu',
	'Seoul',
	'Shin Myungjo Neue',
	'Silom',
	'Skia',
	'Snell Roundhand',
	'ST FangSong',
	'ST FangSong 2',
	'ST Heiti',
	'ST Kaiti',
	'ST Song',
	'Tae Graphic',
	'Taipei',
	'Techno',
	'Textile',
	'Thonburi',
	'Times',
	'Times CY',
	'Zapf Chancery',
	'Zapf Dingbats',
	'Zapfino',
];

	CanvasType.KeyLogger = CTKeyLogger;
	CanvasType.Fonts = CTFonts;
	return CanvasType;
})();