Meteor.startup(function () {

    if (Settings.findOne({_id: 'couchpotatosetting'})) {
        logger.error(Settings.find({}).fetch())
        logger.error('Removing old settings')
        Settings.remove({})
        logger.error('Adding new settings')
        Settings.insert({})
    }

    if (Settings.find().count() === 0) {
        logger.error('Adding default settings')
        Settings.insert({})
    }

    //set TheMovieDB API
    TMDBSearch.api = '95a281fbdbc2d2b7db59680dade828a6'
    TMDBSearch.language = 'en'

    var settings = Settings.find().fetch()[0]

    if (settings.firstRun === true) {
        Settings.update(settings._id, {$set: {firstRun: false}})
        settings = Settings.find().fetch()[0]
        logger.info('First run complete')
    }
    //set Couch Potato on start-up
    CouchPotato.url = (settings.couchPotatoSSL) ? 'https://' + settings.couchPotatoURL : 'http://' + settings.couchPotatoURL
    CouchPotato.port = settings.couchPotatoPORT
    CouchPotato.api = settings.couchPotatoAPI
    CouchPotato.directory = settings.couchPotatoDIRECTORY || ''

    //set SickRage on start-up
    SickRage.url = (settings.sickRageSSL) ? 'https://' + settings.sickRageURL : 'http://' + settings.sickRageURL
    SickRage.port = settings.sickRagePORT
    SickRage.api = settings.sickRageAPI
    SickRage.directory = settings.sickRageDIRECTORY || ''

    //set Sonarr on start-up
    Sonarr.url = (settings.sonarrSSL) ? 'https://' + settings.sonarrURL : 'http://' + settings.sonarrURL
    Sonarr.port = settings.sonarrPORT
    Sonarr.api = settings.sonarrAPI
    Sonarr.directory = settings.sonarrDIRECTORY || ''

    //set Radarr on start-up
    Radarr.url = (settings.radarrSSL) ? 'https://' + settings.radarrURL : 'http://' + settings.radarrURL
    Radarr.port = settings.radarrPORT
    Radarr.api = settings.radarrAPI
    Radarr.directory = settings.radarrDIRECTORY || ''


    Meteor.call('updateSeasons')
    Meteor.call('updateApproved')

})
