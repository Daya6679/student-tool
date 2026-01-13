pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        NODE_ENV = 'production'
        CI = 'true'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Daya6679/student-tool.git'
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

        stage('Run Playwright Tests') {
            steps {
                sh '''
                    npx playwright test --reporter=html
                '''
            }
        }

        stage('Deploy with PM2') {
            steps {
                sh '''
                    npm install -g pm2 || true
                    pm2 delete student-tool || true
                    pm2 start ecosystem.config.js
                    pm2 save
                '''
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
        success {
            echo '✅ CI/CD SUCCESS: Tests passed & App deployed'
        }
        failure {
            echo '❌ CI/CD FAILED: Check test results'
        }
    }
}
