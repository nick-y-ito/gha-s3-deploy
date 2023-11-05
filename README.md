# Deploy to AWS S3
Deploy a static website to AWS S3.

## Table of Contents
- [Deploy to AWS S3](#deploy-to-aws-s3)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Usage](#usage)
  - [Inputs](#inputs)
  - [Outputs](#outputs)
  - [Example](#example)
  - [Creating An Identity Provider](#creating-an-identity-provider)
    - [Create an identity provider in the AWS IAM console](#create-an-identity-provider-in-the-aws-iam-console)
    - [Assign a role to the identity provider](#assign-a-role-to-the-identity-provider)
  - [License](#license)

## Prerequisites
1. Create a S3 bucket and enable static website hosting
2. Add a bucket policy to allow public read access to the bucket
3. [Creating an identity provider on AWS](#creating-an-identity-provider-in-the-aws-iam-console)
4. [Assign a role to the identity provider](#assign-a-role-to-the-identity-provider)

## Usage
```yaml
- uses: uskayyyyy/gha-s3-deploy@v1
    with:
      role-to-assume: ${{ secrets.AWS_ROLE_TO_ASSUME }}
      bucket: ${{ secrets.AWS_BUCKET }}}
      region: us-west-2
      folder: ./dist
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
          role-to-assume: ${{ secrets.AWS_ROLE_TO_ASSUME }}
          bucket: ${{ secrets.AWS_BUCKET }}}
          region: us-west-2   # Optional - Default: us-east-1
          folder: ./dist      # Optional - Default: . (root)
      - name: Output Website URL
        run: echo ${{ steps.deploy.outputs.website-url }}
```

## Creating An Identity Provider
### Create an identity provider in the AWS IAM console
1. Navigate to the Identity Providers page in the AWS IAM console
2. Add a provider with the following properties:
   * Provider type: OpenID Connect
   * Provider URL: https://token.actions.githubusercontent.com
   * Audience: sts.amazonaws.com
### Assign a role to the identity provider
1. Navigate to the identity provider details page created in the previous step
2. Hit the "Assign role" button
3. Create a new role with the following properties:
 * Trusted entity type: Web identity
 * Identity provider: the identity provider you created in step 3
 * Audience: the audience you specified in step 3
 * GitHub organization: your GitHub username or organization name
4. Add right permissions
5. Name the role and create it
6. Make sure the GitHub identity provider is added to the role's trusted relationships

For more information, see [GitHub's documentation](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)

## License
The code in this project is released under the MIT License.