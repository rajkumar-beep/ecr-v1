pipeline {
    agent any

    environment {
        // Docker
        IMAGE_NAME = 'ecs-demo-app'
        IMAGE_TAG  = "${BUILD_NUMBER}"

        // AWS
        AWS_REGION     = 'ap-south-1'
        AWS_ACCOUNT_ID = '884967220621'

        // ECR
        ECR_REPOSITORY = 'ecr-demo-app'
        ECR_REGISTRY   = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

        // ECS
        ECS_CLUSTER = 'ecr-demp-cluster'
        ECS_SERVICE = 'ecr-demo-task-service-6wuzzt9w'
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                """
            }
        }

        stage('Login to Amazon ECR') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'ecr-demo-app'
                ]]) {

                    sh """
                    aws ecr get-login-password --region ${AWS_REGION} | \
                    docker login \
                    --username AWS \
                    --password-stdin ${ECR_REGISTRY}
                    """
                }
            }
        }

        stage('Tag Docker Image') {
            steps {
                sh """
                docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG}

                docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${ECR_REGISTRY}/${ECR_REPOSITORY}:latest
                """
            }
        }

        stage('Push Docker Image') {
            steps {
                sh """
                docker push ${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG}

                docker push ${ECR_REGISTRY}/${ECR_REPOSITORY}:latest
                """
            }
        }

        stage('Deploy to ECS') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'ecr-demo-app'
                ]]) {

                    sh """
                    aws ecs update-service \
                    --cluster ${ECS_CLUSTER} \
                    --service ${ECS_SERVICE} \
                    --force-new-deployment \
                    --region ${AWS_REGION}
                    """
                }
            }
        }

    }

    post {
        success {
            echo "===================================="
            echo "Pipeline Completed Successfully"
            echo "Docker Image Version : ${IMAGE_TAG}"
            echo "Repository : ${ECR_REPOSITORY}"
            echo "Cluster : ${ECS_CLUSTER}"
            echo "Service : ${ECS_SERVICE}"
            echo "===================================="
        }

        failure {
            echo "Pipeline Failed!"
        }
    }
}
