pushd infra
    terraform init
    terraform apply --auto-approve

    BUCKET_NAME=$(terraform output -raw s3_bucket_name)
    CLOUDFRONT_DISTRIBUTION_ID=$(terraform output -raw cloudfront_distribution_id)
    CLOUDFRONT_DISTRIBUTION_DOMAIN_NAME=$(terraform output -raw cloudfront_distribution_domain_name)
popd

aws s3 cp public/ s3://${BUCKET_NAME}/ --recursive --content-type "text/html" --exclude "*" --include "*.html"
aws s3 cp public/ s3://${BUCKET_NAME}/ --recursive --content-type "text/css"  --exclude "*" --include "*.css"
aws s3 cp public/ s3://${BUCKET_NAME}/ --recursive --content-type "application/javascript" --exclude "*" --include "*.js"
aws s3 cp public/ s3://${BUCKET_NAME}/ --recursive --content-type "image/png" --exclude "*" --include "*.png"
aws s3 cp public/ s3://${BUCKET_NAME}/ --recursive --content-type "image/jpeg" --exclude "*" --include "*.jpg" --include "*.jpeg"
aws s3 cp public/ s3://${BUCKET_NAME}/ --recursive --content-type "image/svg+xml" --exclude "*" --include "*.svg"
aws s3 cp public/ s3://${BUCKET_NAME}/ --recursive --content-type "image/webp" --exclude "*" --include "*.webp"

aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} --paths "/*"

