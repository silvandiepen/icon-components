const path = require("path");

const kebabCase = (str) =>
	str
		.match(/[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g)
		.filter(Boolean)
		.map((x) => x.toLowerCase())
		.join("-");

const fileName = (str, settings = null, replace = []) => {
	let strippedFileName = path.basename(str).replace(path.extname(str), "");

	if (replace && replace.length == 2)
		strippedFileName.replace(replace[0], replace[1]);

	if (settings) return `${settings.prefix}${strippedFileName}`;
	else return strippedFileName;
};

const PascalCase = (str) =>
	str
		.replace("-", " ")
		.match(/[a-zA-Z0-9]+/gi)
		.map(function(word) {
			return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
		})
		.join("");

const removeTags = (str, tags) => {
	if (Array.isArray(tags)) {
		let value = str;
		tags.forEach((tag) => {
			value = removeTags(value, tag);
		});
		return value;
	} else {
		const regex = new RegExp(`<[\/]{0,1}(${tags}|${tags})[^><]*>`, "g");
		return str.replace(regex, "");
	}
};

const removeAttrs = (str, attrs) => {
	if (Array.isArray(attrs)) {
		let value = str;
		attrs.forEach((attr) => {
			value = removeAttrs(value, attr);
		});
		return value;
	} else {
		const regex = new RegExp(`/${attrs}="[a-zA-Z0-9:;\.\s\(\)\-\,]*"/gi`, "g");
		return str.replace(regex, "");
	}
};

const prefixedName = (name, prefix) => {
	return prefix
		? `${prefix}-${kebabCase(fileName(name))}`
		: `icon-${kebabCase(fileName(name))}`;
};

const makePrefix = (prefix) => {
	if (prefix == "") return "";
	else return prefix ? `${prefix}-` : "icon-";
};

const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
};

module.exports = {
	kebabCase,
	fileName,
	PascalCase,
	removeTags,
	removeAttrs,
	prefixedName,
	makePrefix,
	asyncForEach
};