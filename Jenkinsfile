// comments
pipeline {
    agent any
    //para hacer el build de los procesos de forma periodica (cada 20 minutos) - tambien se puede definir en job dsl (groovy)
//    triggers {
//        cron('H/10 * * * *')
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
                    bash -c "./consultaEntidad.sh &"
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