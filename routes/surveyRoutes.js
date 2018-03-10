const _ = require('lodash');
const Path = require('path-parser');
// A default/integrated module in the node js system
// Get´s installed when installing node
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
	// Show all surveys on dashboard
	app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
    	.select({
    		recipients: false
    	});

    res.send(surveys);
  });
	// Show 'thanks for voting' when clicked on mails yes or no
  app.get('/api/surveys/:survey_id/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.delete("/api/surveys", requireLogin, async (req, res) => {
  	Survey.removeSurvey(id, (err, survey)=>{
  		if(err){
  			throw err;
  		}
  		res.json(survey);
  	});
  })

  /*app.put("/api/surveys/:survey_id", requireLogin, async (req, res) => {
    Survey.findById(req.params.survey_id, (err, survey) => {
      if (err) {
        res.status(500).send(err);
      } else {
        survey.title = req.body.title || survey.title;
        survey.dateUpdated = Date.now();
        survey._user = req.user.id;
        survey.save((err, survey) => {
          if (err) {
            res.status(500).send(err);
          }
          res.status(200).send(survey);
        });
      }
    });
  });*/


	// Any time someone make a post request to /api/surveys/webhooks
	// show a console.log
	app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:survey_id/:choice');

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, survey_id: match.survey_id, choice: match.choice };
        }
      })
			.compact()
			.uniqBy('email', 'survey_id')
			// Will run through every single event in the events array
			.each(({ survey_id, email, choice }) => {
        Survey.updateOne(
          {
            _id: survey_id,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

		//close of send grid, to not leave it "hanging"
		res.send({});
	});

	// Make sure user is logged in, also make sure user has enough credits
	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

		// Great place to send an email!
		// Sending an email now costs one credits
		const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};