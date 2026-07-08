pipeline {
    agent any

    // ---- Properties / variables defined here, used throughout the file ----
    environment {
        IMAGE_NAME = 'ecs-demo-app'
        IMAGE_TAG  = "${BUILD_NUMBER}"
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
        stage('Test') {
            steps {
                echo "Installing dependencies and running tests..."
                sh 'npm install'
                sh 'npm test'
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
pipeline {
    agent any

    // ---- Properties / variables defined here, used throughout the file ----
    environment {
        IMAGE_NAME = 'ecs-demo-app'
        IMAGE_TAG  = "${BUILD_NUMBER}"
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
        stage('Test') {
            steps {
                echo "Installing dependencies and running tests..."
                sh 'npm install'
                sh 'npm test'
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
