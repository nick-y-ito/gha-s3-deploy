# Deploy to AWS S3
Deploy a static website to AWS S3.

## Usage
1. Create a S3 bucket and enable static website hosting
2. Add a bucket policy to allow public read access to the bucket
3. Create a new IAM user with right permissions
4. Generate an access key for the user
5. Add the access key to your GitHub repository's secrets
6. Use this GitHub action by referencing the v1 branch:
```yaml
- uses: uskayyyyy/gha-s3-deploy@v1
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    bucket-name: your-bucket-name
```

## Inputs
S3 Deploy's Action supports inputs from the user listed in the table below:

Input	Type	Required	Default	Description
| Input                 | Required | Default   | Description                                                 |
| --------------------- | -------- | --------- | ----------------------------------------------------------- |
| aws-access-key-id     | Yes      |           | AWS Access Key ID for authentication                        |
| aws-secret-access-key | Yes      |           | AWS Secret Access Key for authentication                    |
| bucket-name           | Yes      |           | The S3 bucket where your website will be hosted             |
| bucket-region         | No       | us-east-1 | The region of the S3 bucket                                 |
| src-folder            | No       | .         | Absolute path of the folder containing the deployable files |

## Outputs
This action provides the following outputs that can be accessed in subsequent steps of your workflow using the `steps` context.

| Output        | Description                           |
| ------------- | ------------------------------------- |
| `website-url` | The URL of your website hosted on S3. |

## Example
```yaml
# .github/workflows/example.yml

name: Example workflow for S3 Deploy
on: push
jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy
        id: deploy
        uses: uskayyyyy/gha-s3-deploy@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          bucket-name: your-bucket-name
          bucket-region: us-west-2   # Optional - Default: us-east-1
          src-folder: ./dist         # Optional - Default: . (root)
      - name: Output Website URL
        run: echo ${{ steps.deploy.outputs.website-url }}
```

## License
The code in this project is released under the MIT License.