const path = require("path");

const kebabCase = (str) =>
	str
		.match(/[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g)
		.filter(Boolean)
		.map((x) => x.toLowerCase())
		.join("-");

const fileName = (str, settings = null) => {
	if (settings)
		return `${settings.options.prefix}${path
			.basename(str)
			.replace(path.extname(str), "")}`;
	else return `${path.basename(str).replace(path.extname(str), "")}`;
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

const prefixedName = (name, prefix) => {
	return prefix
		? `${prefix}-${kebabCase(fileName(name))}`
		: `icon-${kebabCase(fileName(name))}`;
};

module.exports = { kebabCase, fileName, PascalCase, removeTags, prefixedName };
