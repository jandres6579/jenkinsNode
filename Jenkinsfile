// comments
pipeline {
    agent any
    //para hacer el build de los procesos de forma periodica (cada 20 minutos)
//    triggers {
//        cron('H/20 * * * *')
//    }
    
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
                    bash -c "${WORKSPACE}/npm install"
                '''
            }
        }

        stage('TestingApp') {
            steps {
                echo 'Realizando testeo...'
                sh '''
                    bash -c "${WORKSPACE}/npm test"
                '''
            }
        }

        stage('RunningApp') {
            steps {
                echo 'Ejecutando aplicación...'
                sh '''
                    #De esta forma se pueden añaden comentarios.
                    bash -c "${WORKSPACE}/npm start &"
                   '''
            }
        }

        stage('Obtain result') {
            steps {
                echo 'Muestra información entidad...'
                sh '''
                    bash -c "${WORKSPACE}/./consultaEntidad.sh &"
                '''
            }
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