Q1 : Pourquoi <Navigate /> et pas navigate() ?
Les hooks comme useNavigate() ne peuvent être utilisés que dans le
corps d’un composant React, pas directement dans le JSX. <Navigate />
est un composant, donc il peut être rendu directement dans le JSX pour
effectuer une redirection.
Q2 : Différence entre navigate(from) et navigate(from,
{ replace: true })
— navigate(from) : ajoute une nouvelle entrée dans l’historique.
— navigate(from, { replace: true }) : remplace l’entrée actuelle
dans l’historique.
Q3 : Pourquoi setProjects(prev => [...prev, data])
après un POST ?
Cette approche permet de mettre à jour l’état local immédiatement sans
refaire une requête GET. Cela améliore les performances et rend l’interface
plus réactive.
Q4 : Scénarios de test
— /dashboard sans être connecté : redirection vers login.
— /projects/1 sans être connecté : redirection vers login.
— /nimportequoi : redirection vers login.
— / (racine) : redirection vers login.
 Retour navigateur après connexion : dépend de l’utilisation de
replace: true.
Q5 : Différence entre <Link> et <NavLink>
— <Link> : navigation interne sans rechargement de page.
— <NavLink> : identique à <Link> mais permet de gérer un état actif
(classe CSS).
NavLink est utilisé pour styliser les liens actifs (ex : menu de navigation).
Q6 : Différence entre POST et PUT dans ce com-
posant
— POST : formulaire vide, envoi vers /projects.
— PUT : champs pré-remplis, envoi vers /projects/:id.
Q7 : POST avec json-server arrêté
Un message d’erreur s’affiche, mais Erreur undefined indique que la
gestion des erreurs est incomplète. Il faut utiliser :
catch (err) {
setError(err.message);
}
Q8 : Différence entre fetch et Axios
— fetch : ne lance pas d’erreur pour les statuts HTTP .
— Axios : lance automatiquement une erreur pour les statuts 2xx.
