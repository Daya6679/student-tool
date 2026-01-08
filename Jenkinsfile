pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                  npm install
                  npx playwright install
                '''
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
            }
        }

        stage('Deploy with PM2') {
            steps {
                sh '''
                  pm2 delete student-tool || true
                  pm2 start ecosystem.config.js
                  pm2 save
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Build & Deployment Successful'
        }
        failure {
            echo '❌ Deployment Failed'
        }
    }
}
