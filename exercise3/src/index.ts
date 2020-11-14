import { app } from './app';

app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), () => {
  console.log(`Exercise 3 is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
});
