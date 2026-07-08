pipeline {
    agent any

    // ---- Properties / variables defined here, used throughout the file ----
       environment {
    IMAGE_NAME = 'ecs-demo-app'
    IMAGE_TAG = "${BUILD_NUMBER}"

    AWS_REGION = 'ap-south-1'
    AWS_ACCOUNT_ID = '884967220621'
    ECR_REPOSITORY = 'ecr-demo-app'
    ECR_REGISTRY = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
}
    

    stages {

        // STAGE 1: Pull code from GitHub
        // WHY: Jenkins doesn't have your code by default - this stage checks
        // out the exact commit that triggered the build.
        stage('Pull') {
            steps {
                echo "Pulling latest code from repository..."
                checkout scm
            }
        }

        // STAGE 2: Run tests
        // WHY: Catch broken code BEFORE wasting time building a Docker image
        // out of it. If tests fail, pipeline stops here automatically.
       stage('Install Dependencies') {
    steps {
        echo "Installing dependencies..."
        sh 'npm install'
    }
}

        // STAGE 3: Build Docker image
        // WHY: Package the app + its runtime into a single image, tagged
        // with the Jenkins build number so every build is traceable.
        stage('Build Image') {
            steps {
                echo "Building Docker image: ${IMAGE_NAME}:${IMAGE_TAG}"
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }
 stage('Login to ECR') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'ecr-demo-app'
                ]]) {
                    sh '''
                    aws ecr get-login-password --region $AWS_REGION | \
                    docker login --username AWS --password-stdin $ECR_REGISTRY
                    '''
                }
            }
        }

    }

    post {
        success {
            echo "Build succeeded: ${IMAGE_NAME}:${IMAGE_TAG}"
        }
        failure {
            echo "Pipeline failed - check the stage above that errored"
        }
    }
}
