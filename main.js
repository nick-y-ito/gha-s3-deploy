const core = require("@actions/core");
const exec = require("@actions/exec");

const run = () => {
	const bucketName = core.getInput("bucket-name", { required: true });
	const bucketRegion = core.getInput("bucket-region", { required: true });
	const distFolder = core.getInput("dist-folder", { required: true });

	exec.exec(
		`aws s3 sync ${distFolder} s3://${bucketName} --region ${bucketRegion}`
	);

	core.setOutput(
		"website-url",
		`http://${bucketName}.s3-website-${bucketRegion}.amazonaws.com/`
	);
};

run();
