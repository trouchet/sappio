export const getHome = (req, res) => {
  res.render('index', { title: 'Home' });
};
