pushd infra
    terraform init
    terraform apply --auto-approve

    BUCKET_NAME=$(terraform output -raw s3_bucket_name)
    CLOUDFRONT_DISTRIBUTION_ID=$(terraform output -raw cloudfront_distribution_id)
    CLOUDFRONT_DISTRIBUTION_DOMAIN_NAME=$(terraform output -raw cloudfront_distribution_domain_name)
popd
aws s3 cp public/ s3://${BUCKET_NAME}/ --recursive

aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} --paths "/*"
