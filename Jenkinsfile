pipeline {
    agent any

    environment {
        MONGO_URI = credentials('enov8-mongo-uri') // stored securely in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo "Building branch: ${env.BRANCH_NAME}"
            }
        }

        stage('Set .env file') {
            steps {
                script {
                    def envFile = ""

                    if (env.BRANCH_NAME == 'main') {
                        envFile = "PORT=3001\nMONGO_URI=${MONGO_URI}"
                    } else if (env.BRANCH_NAME == 'dev') {
                        envFile = "PORT=3002\nMONGO_URI=${MONGO_URI}"
                    } else if (env.BRANCH_NAME == 'test') {
                        envFile = "PORT=3003\nMONGO_URI=${MONGO_URI}"
                    } else {
                        envFile = "PORT=9999\nMONGO_URI=${MONGO_URI}"
                        echo "Running feature branch: No deployment, only build"
                    }

                    writeFile file: '.env', text: envFile
                }
            }
        }

        stage('Docker Build & Deploy') {
            when {
                anyOf {
                    branch 'main'
                    branch 'dev'
                    branch 'test'
                }
            }
            steps {
                sh 'docker compose down || true'
                sh 'docker compose up --build -d'
            }
        }

        stage('Build Validation (No Deploy)') {
            when {
                not {
                    anyOf {
                        branch 'main'
                        branch 'dev'
                        branch 'test'
                    }
                }
            }
            steps {
                sh 'echo "Validating non-main/dev/test branch. No deployment."'
                sh 'docker compose build'
            }
        }
    }
}
