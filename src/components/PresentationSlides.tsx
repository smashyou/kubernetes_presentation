import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface SlideContent {
  title: string;
  subtitle?: string;
  imageDescription: string;
  content: React.ReactNode;
  demoCode?: string;
  narratorNotes?: string;
  imageUrl?: string;
}

const PresentationSlides = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const slides: SlideContent[] = [
    {
      title: "Welcome to Cosmic Kitchen",
      imageDescription:
        "Welcome to Cosmic Kitchen, where dishes like PHP Apache Pizzas are crafted in a high-tech kitchen. A viral X post spikes orders, but Kubernetes ensures flawless delivery with scaling and secure access.",
      content: (
        <div className="space-y-4">
          <p className="text-lg">
            A futuristic food delivery service handling thousands of orders. How
            does it stay flawless? Kubernetes, the head chef, orchestrates the
            chaos.
          </p>
        </div>
      ),
      narratorNotes:
        "Introduce the analogy. Ask, 'How do apps scale and stay secure like a busy restaurant?' Frame the kitchen as your EKS cluster from Week 2.",
    },
    {
      title: "The Cosmic Kitchen Breakdown",
      imageDescription:
        "The kitchen is our EKS cluster from Week 2. Chefs (containers) work in teams (pods) at stations (nodes). The head chef (control plane) manages scaling and security.",
      content: (
        <div className="space-y-4">
          <ul className="list-disc list-inside space-y-2">
            <li className="text-lg">Kitchen = Kubernetes Cluster</li>
            <li className="text-lg">Chefs = Containers (apps)</li>
            <li className="text-lg">
              Teams of Chefs = Pods (groups of containers)
            </li>
            <li className="text-lg">Stations = Nodes (servers)</li>
            <li className="text-lg">Head Chef = Control Plane</li>
            <li className="text-lg">Waiters = Load Balancers</li>
          </ul>
        </div>
      ),
      narratorNotes:
        "Explain components, emphasizing pods as the scheduled unit. Link to your jryu-eks-cluster setup via Terraform.",
    },
    {
      title: "A Kitchen Without Kubernetes",
      imageDescription:
        "Without Kubernetes, chefs idle, crashes go unnoticed, rushes overwhelm, and pantry access is unsecured. It's chaos without the head chef.",
      content: (
        <div className="space-y-4">
          <ul className="list-disc list-inside space-y-2">
            <li className="text-lg">Manual task assignment</li>
            <li className="text-lg">Crashes unnoticed</li>
            <li className="text-lg">No scaling for rushes</li>
            <li className="text-lg">Unsecured pantry access</li>
          </ul>
        </div>
      ),
      narratorNotes:
        "Highlight manual management and security risks. Ask, 'How would you handle 10,000 pizza orders manually?' Transition to Kubernetes' solution.",
    },
    {
      title: "Kubernetes: The Head Chef",
      imageDescription:
        "The head chef schedules teams to cook PHP Apache Pizzas, scales for rushes, and secures pantry access with keycards, just like our Week 2 and 3 exercise setups.",
      content: (
        <div className="space-y-4">
          <ul className="list-disc list-inside space-y-2">
            <li className="text-lg">Scheduling: Assigns teams to stations</li>
            <li className="text-lg">Self-healing: Replaces fainted chefs</li>
            <li className="text-lg">Auto-scaling: Adds teams for rushes</li>
            <li className="text-lg">
              Load Balancing: Waiters distribute orders
            </li>
            <li className="text-lg">
              Resource Allocation: Manages ingredients
            </li>
            <li className="text-lg">
              Security: Secures pantry and oven access
            </li>
          </ul>
        </div>
      ),
      narratorNotes:
        "Focus on autoscaling (Week 2) and security (Week 3). Use analogies (rush = traffic spike). Solve Slide 3's chaos.",
    },
    {
      title: "Scaling PHP Apache Pizzas",
      imageDescription:
        "Deploying PHP Apache Pizzas assigns a team with 2 chefs. The HPA adds more teams when a viral X post spikes demand, scaling up to 20 based on 50% CPU usage (Week 2).",
      content: (
        <div className="space-y-4">
          <p className="text-lg">
            Deploy PHP Apache: kubectl apply -f php-apache-deployment.yaml =
            Assign team to cook pizzas
          </p>
          <p className="text-lg">
            Auto-scale: kubectl apply -f hpa.yaml = Add teams for rush
          </p>
        </div>
      ),
      demoCode: `# php-apache-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: php-apache
spec:
  replicas: 2
  selector:
    matchLabels:
      app: php-apache
  template:
    metadata:
      labels:
        app: php-apache
    spec:
      containers:
      - name: php-apache
        image: php:apache
        resources:
          requests:
            cpu: "100m"
            memory: "128Mi"
          limits:
            cpu: "200m"
            memory: "256Mi"
        ports:
        - containerPort: 80

# hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: php-apache-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: php-apache
  minReplicas: 2
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 50

# Apply and verify
kubectl apply -f php-apache-deployment.yaml
kubectl apply -f php-apache-service.yaml
kubectl apply -f hpa.yaml
kubectl get hpa php-apache-hpa`,
      narratorNotes:
        "Show YAMLs from Week 2. Explain Cluster Autoscaler scaling nodes and HPA scaling pods. Optionally, mention load testing.",
    },
    {
      title: "Securing the Kitchen",
      imageDescription:
        "Granting pantry access for spices/recipes is like OIDC/IRSA for S3 access. Restricting ovens to authorized chefs is like RBAC for cluster access (Week 3).",
      content: (
        <div className="space-y-4">
          <p className="text-lg">
            OIDC/IRSA: Grant pantry (S3) access to teams
          </p>
          <p className="text-lg">RBAC: Restrict oven access</p>
          <p className="text-sm text-cyber-purple">
            Week 3 exercise - Manager Role: Grant full access in S3 bucket for
            both namespaces
          </p>
          <p className="text-sm text-cyber-purple">
            Week 3 exercise - Developer Role: Grant only read access in S3
            bucket for developer namespaces
          </p>
        </div>
      ),
      demoCode: `# manager-developer-rbac-role.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: manager
---
apiVersion: v1
kind: Namespace
metadata:
  name: developer
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: manager-sa
  namespace: manager
  annotations:
    eks.amazonaws.com/role-arn: "arn:aws:iam::123456789012:role/manager-role"
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: developer-sa
  namespace: developer
  annotations:
    eks.amazonaws.com/role-arn: "arn:aws:iam::123456789012:role/developer-role"
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: manager-pod-full
  namespace: manager
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "create", "update", "delete"] # Manager is given full access control in manager namespace
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: manager-pod-full
  namespace: developer
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "create", "update", "delete"] # Manager is given full access control in developer namespace
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: developer-pod-read
  namespace: developer
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list"] # developer is given only read access control in only developer namespace
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: manager-pod-full-binding
  namespace: manager
subjects:
- kind: ServiceAccount
  name: manager-sa
  namespace: manager
roleRef:
  kind: Role
  name: manager-pod-full
  apiGroup: rbac.authorization.k8s.io
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: manager-pod-full-binding
  namespace: developer
subjects:
- kind: ServiceAccount
  name: manager-sa
  namespace: manager
roleRef:
  kind: Role
  name: manager-pod-full
  apiGroup: rbac.authorization.k8s.io
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: developer-pod-read-binding
  namespace: developer
subjects:
- kind: ServiceAccount
  name: developer-sa
  namespace: developer
roleRef:
  kind: Role
  name: developer-pod-read
  apiGroup: rbac.authorization.k8s.io
---
apiVersion: v1
kind: Pod
metadata:
  name: manager-pod
  namespace: manager
spec:
  serviceAccountName: manager-sa
  containers:
  - name: aws-cli
    image: amazon/aws-cli
    command: ["/bin/sh", "-c"]
    args:
    - |
      echo "Hello World file" > helloworld.txt;
      aws s3 cp helloworld.txt s3://example-bucket/helloworld.txt;
      aws s3 ls s3://example-bucket/;
      sleep 3600
    volumeMounts:
    - name: bucket-name
      mountPath: /bucket-name.txt
      subPath: bucket-name.txt
  volumes:
  - name: bucket-name
    configMap:
      name: bucket-name-config
---
apiVersion: v1
kind: Pod
metadata:
  name: developer-pod
  namespace: developer
spec:
  serviceAccountName: developer-sa
  containers:
  - name: aws-cli
    image: amazon/aws-cli
    command: ["/bin/sh", "-c"]
    args:
    - |
      echo "Hello World file" > helloworld.txt;
      aws s3 cp helloworld.txt s3://example-bucket/helloworld.txt || echo "Upload failed as expected";
      aws s3 ls s3://example-bucket/;
      sleep 3600
    volumeMounts:
    - name: bucket-name
      mountPath: /bucket-name.txt
      subPath: bucket-name.txt
  volumes:
  - name: bucket-name
    configMap:
      name: bucket-name-config
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: bucket-name-config
  namespace: manager
data:
  bucket-name.txt: example-bucket
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: bucket-name-config
  namespace: developer
data:
  bucket-name.txt: example-bucket

# Apply and verify:
kubectl apply -f manager-developer-rbac-role.yaml

# Act as the manager-sa service account in the manager namespace 
# and list all pods in the manager namespace. (SHOULD WORK)
kubectl --as=system:serviceaccount:manager:manager-sa get pods -n manager

# Act as the manager-sa service account in the manager namespace 
# and list all pods in the developer namespace. (SHOULD WORK)
kubectl --as=system:serviceaccount:manager:manager-sa get pods -n developer

# Act as the developer-sa service account in the developer namespace 
# and list all pods in the developer namespace. (SHOULD WORK)
kubectl --as=system:serviceaccount:developer:developer-sa get pods -n developer

# Act as the developer-sa service account in the developer namespace 
# and list all pods in the manager namespace. (SHOULD NOT WORK)
kubectl --as=system:serviceaccount:developer:developer-sa get pods -n manager

# Verify via log:
# Confirm that file upload and list operations are successful
kubectl logs manager-pod -n manager 

# Confirm that only list operation is successful and upload operation failed
kubectl logs developer-pod -n developer`,
      narratorNotes:
        "Explain OIDC/IRSA for S3 access via jryu-eks-cluster Service Accounts (manager_role, developer_role). Show RBAC limiting pod visibility.",
    },
    {
      title: "EKS vs. Open-Source Kubernetes",
      imageDescription:
        "In Cosmic Kitchen, EKS has AWS managing the head chef, so you focus on cooking. With open-source Kubernetes, you hire and train the head chef yourself.",
      content: (
        <div className="space-y-4">
          <p className="text-lg font-bold mb-2">Main Difference:</p>
          <ul className="list-disc list-inside space-y-2">
            <li className="text-lg">
              AWS EKS: Managed control plane (head chef) by AWS
            </li>
            <li className="text-lg">
              Open-Source Kubernetes: You manage the control plane
            </li>
          </ul>
        </div>
      ),
      narratorNotes:
        "Briefly explain EKS simplifies control plane management (Week 2's jryu-eks-cluster). Mention open-source Kubernetes requires manual setup.",
    },
    {
      title: "Why Kubernetes Shines",
      imageDescription:
        "Customers enjoy PHP Apache Pizzas on time, with secure pantry & secret recipes access and restricted ovens. Kubernetes makes it reliable, scalable, and secure.",
      content: (
        <div className="space-y-4">
          <ul className="list-disc list-inside space-y-2">
            <li className="text-lg">
              Reliable: Self-healing ensures no delays
            </li>
            <li className="text-lg">Scalable: Handles 10 or 10,000 orders</li>
            <li className="text-lg">
              Secure: Protects pantry, secret recipes, and oven access
            </li>
          </ul>
        </div>
      ),
      narratorNotes:
        "Summarize benefits, linking to Week 2 (scaling) and Week 3 (security).",
    },
    {
      title: "Thank You!",
      imageDescription:
        "Kubernetes powers Cosmic Kitchen, scaling PHP Apache Pizzas for viral rushes and securing pantry access. It's the head chef for modern apps. Thank you!",
      content: (
        <div className="space-y-4">
          <p className="text-lg text-center">
            Kubernetes: Orchestrating Cosmic Kitchen with reliability,
            scalability, and security.
          </p>
        </div>
      ),
      narratorNotes:
        "Summarize Kubernetes as the orchestrator for scaling (Week 2) and security (Week 3). Invite questions if time allows.",
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const toggleNotes = () => {
    setShowNotes(!showNotes);
  };

  // Use uploaded images instead of random Unsplash images
  const getSlideImageUrl = (slideIndex: number) => {
    switch (slideIndex) {
      case 0:
        return "./images/slide1.png"; // Slide 1 - Cosmic Kitchen welcome
      case 1:
        return "./images/slide2.png"; // Slide 2 - Kitchen Breakdown
      case 2:
        return "./images/slide3.png"; // Slide 3 - Kitchen Without Kubernetes
      case 3:
        return "./images/slide4.png"; // Slide 4 - Head Chef in Action
      case 4:
        return "./images/slide5.png"; // Slide 5 - Scaling PHP Apache Pizzas
      case 5:
        return "./images/slide6.png"; // Slide 6 - Securing the Kitchen
      case 6:
        return "./images/slide7.png"; // Slide 7 - EKS vs Open-Source
      case 7:
        return "./images/slide8.png"; // Slide 8 - Why Kubernetes Shines
      case 8:
        return "./images/slide9.png"; // Slide 9 - Thank You!
      default:
        return "./images/slide1.png"; // Default to first image
    }
  };

  return (
    <div className="cyber-panel presentation-container min-h-[80vh] flex flex-col">
      <h1 className="cyber-title text-3xl font-orbitron mb-8 text-center">
        Kubernetes: Orchestrating the Cosmic Kitchen
      </h1>

      <div className="flex-grow flex flex-col">
        <div className="slide-content flex-grow flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <div className="slide-image-container rounded-lg mb-4 overflow-hidden">
              <AspectRatio ratio={3 / 2} className="w-full">
                <img
                  src={getSlideImageUrl(currentSlide)}
                  alt={slides[currentSlide].imageDescription}
                  className="w-full h-full object-contain"
                />
              </AspectRatio>
            </div>
            <div className="text-xs text-gray-400 mb-4">
              {slides[currentSlide].imageDescription}
            </div>
          </div>

          <div className="md:w-1/2 flex flex-col">
            <h2 className="text-2xl font-orbitron text-cyber-pink mb-4">
              {slides[currentSlide].title}
            </h2>
            {slides[currentSlide].subtitle && (
              <h3 className="text-xl font-orbitron text-cyber-blue mb-4">
                {slides[currentSlide].subtitle}
              </h3>
            )}
            <div className="slide-text mb-4 text-gray-200">
              {slides[currentSlide].content}
            </div>

            {slides[currentSlide].demoCode && (
              <div className="bg-black/40 p-4 rounded-md overflow-auto mb-4 text-xs md:text-sm">
                <pre className="text-cyber-blue font-mono whitespace-pre-wrap">
                  {slides[currentSlide].demoCode}
                </pre>
              </div>
            )}
          </div>
        </div>

        {showNotes && slides[currentSlide].narratorNotes && (
          <div className="presenter-notes mt-4 p-4 bg-black/40 rounded-md border border-cyber-blue/30">
            <h4 className="text-sm text-cyber-blue mb-2">Presenter Notes:</h4>
            <p className="text-gray-300 text-sm">
              {slides[currentSlide].narratorNotes}
            </p>
          </div>
        )}

        <div className="navigation flex justify-between items-center mt-6">
          <div className="flex gap-2">
            <Button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="flex items-center gap-2 bg-cyber-blue hover:bg-cyber-blue/80 disabled:bg-gray-700"
            >
              <ArrowLeft size={16} />
              Previous
            </Button>
            <Button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="flex items-center gap-2 bg-cyber-purple hover:bg-cyber-purple/80 disabled:bg-gray-700"
            >
              Next
              <ArrowRight size={16} />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={toggleNotes}
              variant="outline"
              className="border-cyber-pink text-cyber-pink hover:bg-cyber-pink/10"
            >
              {showNotes ? "Hide Notes" : "Show Notes"}
            </Button>

            <span className="text-cyber-blue">
              {currentSlide + 1} / {slides.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentationSlides;
