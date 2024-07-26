import { Express } from 'express';
import passport from 'passport';
import requireLogin from '../middlewares/requireLogin';

const authRoutes = (app: Express) => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => { res.redirect('/surveys') });

  app.get('/api/logout', requireLogin, (req, res) => {
    req.logout((err: any) => err);
    res.redirect('/');
  });

  app.get('/api/current_user', requireLogin, (req, res) => {
    res.send(req.user);
  });
};

export default authRoutes;
