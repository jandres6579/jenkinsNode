// comments
pipeline {
    agent any

    triggers {
            pollSCM('@daily')
            cron('H/30 * * * *')
    }
    
    options {
        // using the Timestamper plugin we can add timestamps to the console log
        timestamps()
        
        //If specified, only up to this number of build records are kept.

        /*Parameters for logRotator (from the source code):

                daysToKeepStr: history is only kept up to this days.
                numToKeepStr: only this number of build logs are kept.
                artifactDaysToKeepStr: artifacts are only kept up to this days.
                artifactNumToKeepStr: only this number of builds have their artifacts kept.
        */
        buildDiscarder(logRotator(numToKeepStr: "5"))
    }

    stages {

        stage('CheckOut-Git') {
            steps {
                echo 'CheckOut-Git...'
                git poll: true, url: 'https://github.com/jandres6579/jenkinsNode.git'
            }
        }

        stage('Obtain system information..') {
            steps {
                echo 'Obteniendo información del sistema...'
                sh '''
                    bash -c "echo $PATH && npm --version && grunt --version"
                '''
            }
        }
        
        stage('Install dependencies') {
            steps {
                echo 'Instalando dependencias del proyecto (package.json)...'
                sh '''
                    bash -c "npm install"
                '''
            }
        }

        stage('TestingApp') {
            steps {
                echo 'Realizando testeo...'
                sh '''
                    bash -c "npm test"
                '''
            }
        }

        stage('RunningApp') {
            steps {
                echo 'Ejecutando aplicación...'
                sh '''
                    #De esta forma se pueden añaden comentarios.
                    bash -c "npm start &"
                   '''
            }
        }

        stage('Obtain result') {
            steps {
                echo 'Muestra información entidad...'
                sh '''
                    bash -c "./consultaEntidad.sh"
                '''
            }
        }
    }

    post {
        
        /*
            always: Run the steps in the post section regardless of the completion status of the Pipeline’s or stage’s run.
            changed: Only run the steps in post if the current Pipeline’s or stage’s run has a different completion status from its previous run.
            fixed: Only run the steps in post if the current Pipeline’s or stage’s run is successful and the previous run failed or was unstable.
            regression: Only run the steps in post if the current Pipeline’s or stage’s run’s status is failure, unstable, or aborted and the previous run was successful.
            aborted: Only run the steps in post if the current Pipeline’s or stage’s run has an "aborted" status, usually due to the Pipeline being manually aborted. This is typically denoted by gray in the web UI.
            failure: Only run the steps in post if the current Pipeline’s or stage’s run has a "failed" status, typically denoted by red in the web UI.
            success: Only run the steps in post if the current Pipeline’s or stage’s run has a "success" status, typically denoted by blue or green in the web UI.
            unstable: Only run the steps in post if the current Pipeline’s or stage’s run has an "unstable" status, usually caused by test failures, code violations, etc. This is typically denoted by yellow in the web UI.
            cleanup:Run the steps in this post condition after every other post condition has been evaluated, regardless of the Pipeline or stage’s status.


        */

        failure {
            mail to: 'jasanchez@odins.es',
                from: 'jasanchez@odins.es',
                    subject: "Failure Pipeline: ${currentBuild.fullDisplayName}",
                        body: "Run has a failed status: ${env.BUILD_URL}"
        }

        fixed {
            mail to: 'jasanchez@odins.es',
                    from: 'jasanchez@odins.es',
                        subject: "Fixed Pipeline: ${currentBuild.fullDisplayName}",
                            body: "Run is successful and the previous run failed or was unstable: ${env.BUILD_URL}"
        }

        success {
            mail to: 'jasanchez@odins.es',
                    from: 'jasanchez@odins.es',        
                        subject: "Success Pipeline: ${currentBuild.fullDisplayName}",
                            body: "Run has a success status: ${env.BUILD_URL}"
        }
    }
}

/*


#!/bin/bash
echo '********* INICIO PROCESO ************'
echo $PATH
node --version
npm --version
grunt --version
npm install
npm test
npm start
./consultaEntidad.sh
echo '********* FIN PROCESO ************'
*/