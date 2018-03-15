const fileSytem = require('fs');
const pathTool = require('path');

const { join: joinPath } = pathTool;

module.exports = function findNPMProjectRootFolderAndPackageJSON(options = {}) {
	const {
		searchingStartPath = process.cwd(),
		desiredNPMProjectName = '',
	} = options;


	if (desiredNPMProjectName) {
		throwIfNPMProjectNameSeemsInvalid(desiredNPMProjectName);
	}


	let currentCheckingPath = searchingStartPath;
	let packageJSON;

	while (
		! (packageJSON = detectPackageJSON(currentCheckingPath, desiredNPMProjectName)) &&
		! folderIsTopMostOne(currentCheckingPath)
	) {
		currentCheckingPath = pathTool.resolve(currentCheckingPath, '..');
	}

	if (! packageJSON) {
		return null;
	}

	return {
		npmProjectRootPath: currentCheckingPath,
		packageJSON,
	};
};


function throwIfNPMProjectNameSeemsInvalid(projectName) { // https://docs.npmjs.com/files/package.json#name
	if (
		! (
			(
				projectName.match(/@[a-z]+\/[a-z_-]+/) ||
				projectName.match(/[a-z]+[a-z_-]+/)
			)

			&&

			projectName.length < 215
		)
	) {
		throw RangeError('NPM project name should only contains lowercase letters, "@", "-", "_", or "/".');
	}
}

function detectPackageJSON(folder, desiredNPMProjectName) {
	const foundPackageJsonFullPath = joinPath(folder, 'package.json');

	if (fileSytem.existsSync(foundPackageJsonFullPath)) {
		const packageJSON = require(foundPackageJsonFullPath); // eslint-disable-line import/no-dynamic-require

		if (packageJSON && typeof packageJSON === 'object') {
			if (! desiredNPMProjectName) { // If it's not specified, that means any project name counts.
				return packageJSON;
			}

			if (packageJSON.name === desiredNPMProjectName) { // We've found the project!
				return packageJSON;
			}
		}
	}

	return null; // Sorry! Not this one. Let's return.
}

function folderIsTopMostOne(folder) {
	const segments = folder.split(pathTool.sep);
	return segments.length === 2 && segments[1].length === 0;
}