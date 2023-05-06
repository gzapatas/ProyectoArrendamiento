.ONESHELL:

frontend:
	cd kubernetes
	kubectl delete -f frontend-deploy.yaml
	kubectl delete -f frontend-svc.yaml
	kubectl apply -f frontend-deploy.yaml
	kubectl apply -f frontend-svc.yaml
	cd ../

loanservice:
	cd kubernetes
	kubectl delete -f loanservice-deploy.yaml
	kubectl delete -f loanservice-svc.yaml
	kubectl apply -f loanservice-deploy.yaml
	kubectl apply -f loanservice-svc.yaml
	cd ..

loginservice:
	cd kubernetes
	kubectl delete -f loginservice-deploy.yaml
	kubectl delete -f loginservice-svc.yaml
	kubectl apply -f loginservice-deploy.yaml
	kubectl apply -f loginservice-svc.yaml
	cd ..

ingress:
	cd kubernetes
	kubectl delete -f ingress.yaml
	kubectl apply -f ingress.yaml
	cd ..

down:
	cd kubernetes
	kubectl delete -f ingress.yaml
	kubectl delete -f frontend-deploy.yaml
	kubectl delete -f frontend-svc.yaml
	kubectl delete -f loginservice-deploy.yaml
	kubectl delete -f loginservice-svc.yaml
	kubectl delete -f loanservice-deploy.yaml
	kubectl delete -f loanservice-svc.yaml
	cd ..

up:
	cd kubernetes
	kubectl apply -f loginservice-deploy.yaml
	kubectl apply -f loginservice-svc.yaml
	kubectl apply -f loanservice-deploy.yaml
	kubectl apply -f loanservice-svc.yaml
	kubectl apply -f frontend-deploy.yaml
	kubectl apply -f frontend-svc.yaml
	kubectl apply -f ingress.yaml
	cd ..

pods:
	kubectl get pods

svc:
	kubectl get svc

build-registry:
	cd dockerfiles
	docker compose -f docker-compose.registry.yaml build
	docker compose -f docker-compose.registry.yaml up -d
	cd ..

build-frontend:
	cd dockerfiles
	docker compose build frontend --no-cache
	docker push localhost:5000/frontend
	cd ..

build-loan:
	cd dockerfiles
	docker compose build loanservice --no-cache
	docker push localhost:5000/loanservice
	cd ..

build-login:
	cd dockerfiles
	docker compose build loginservice --no-cache
	docker push localhost:5000/loginservice
	cd ..

read-context:
	kubectl config get-contexts

desktop-context:
	kubectl config use-context docker-desktop