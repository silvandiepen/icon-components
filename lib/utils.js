exports.asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
};

exports.WAIT = async () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve("resolved");
		}, 0);
	});
};
