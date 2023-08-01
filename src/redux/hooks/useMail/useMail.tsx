import { DEBUG_MODE, MailInformation, PHOTO_NAME } from '@src/utils/constants';
import RNSmtpMailer from 'react-native-smtp-mailer';
import RNFS from 'react-native-fs';
import { IIncidence } from '@src/types/interfaces';

export default function useMail() {

    const sendEmail = (incidence: IIncidence, ok:any, ko:any) => {

        const body = '[' + incidence.data + ' - ' + incidence.time + ']<br /><b>' + incidence.title + '</b><br/>' + incidence.description + '<br/><br/><b>Localització:</b> ' + incidence?.address + ' (' + incidence?.location?.latitude + ', ' + incidence?.location?.longitude + ')';

        RNSmtpMailer.sendMail({
            mailhost: MailInformation.mailhost,
            port: MailInformation.port,
            ssl: false, //if ssl: false, TLS is enabled,**note:** in iOS TLS/SSL is determined automatically, so either true or false is the same
            username: MailInformation.username,//'734b6aa48f2e0c563214412a664cc4d2',
            password: MailInformation.password,//'fff0e38fa9bc00fa73711031a66ef194',
            fromName: MailInformation.fromName,
            recipients: DEBUG_MODE ? MailInformation.recipientsDebug : MailInformation.recipients,
            bcc: [], //completely optional
            subject: MailInformation.subject + ' ' + incidence.title,
            htmlBody: body, //
            attachmentPaths: [RNFS.DocumentDirectoryPath + '/' + PHOTO_NAME],
            attachmentNames: [PHOTO_NAME], //only used in android, these are renames of original files. in ios filenames will be same as specified in path. In ios-only application, leave it empty: attachmentNames:[]
            //needed for android, in ios-only application, leave it empty: attachmentTypes:[]. Generally every img(either jpg, png, jpeg or whatever) file should have "img", and every other file should have its corresponding type.
        })
        .then(success => {
            console.log(success);
            ok();
        })
        .catch(err => {
            console.log(err);
            ko();
        });
    };


    return [sendEmail] as const;
}
