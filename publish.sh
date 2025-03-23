#!/bin/bash

# Função para criar a imagem Docker
criar_imagem_docker() {
  local ambiente=$1
  
  echo "Criando imagem do Sincronizador Nébula"

  IMAGE_TAG="nebulasistemas/sincronizador-nebula:$ambiente"

  echo "docker build -t $IMAGE_TAG"
  docker build -t $IMAGE_TAG .

  echo "docker login -u nebulasistemas"
  docker login -u nebulasistemas --password 0457bc93-4e0f-4786-a1e6-1cad45a44a0d

  echo "docker push $IMAGE_TAG"
  docker push $IMAGE_TAG

  echo "docker rmi $IMAGE_TAG"
  docker rmi $IMAGE_TAG
}

# Função para exibir a mensagem de uso do script
usage() {
  echo "Uso: $0 <ambiente>"
  echo "Exemplo: $0 dev"
  exit 1
}

# Valida os argumentos
if [ $# -ne 1 ]; then
  usage
fi

AMBIENTE=$1

# Início do script
echo "Iniciando o projeto no ambiente: $AMBIENTE"

# Chamar a função quando necessário
criar_imagem_docker "$AMBIENTE"

echo "Processo concluído no ambiente: $AMBIENTE"
