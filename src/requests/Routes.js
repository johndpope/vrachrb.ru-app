import React  from "react";
/**
 * Класс с Мультиплатформенными методами */
class Routes {

    // Base URLs
    static baseURL = "https://vrachrb.atmadev.ru/";
    static apiURL  = this.baseURL+"api/";

    // Routes
    static isAuthURL                     = this.apiURL + "Is_auth";
    static signInURL                     = this.apiURL + "SignIn";
    static registerURL                   = this.apiURL + "Register";
    static signOutURL                    = this.apiURL + "SignOut";
    static askQuestionURL                = this.apiURL + "Ask_question";
    static sendMessageURL                = this.apiURL + "SendMessage";
    static getCabinetURL                 = this.apiURL + "GetCabinet";
    static getSpecialistsURL             = this.apiURL + "GetSpecialists";
    static getAnamnesURL                 = this.apiURL + "Get_anamnes";
    static getSpecialistBySpecialtyIDURL = this.apiURL + "GetSpecialistBySpecialtyID";
    static getSpecialistQuestionsURL     = this.apiURL + "Get_specialist_questions";
    static getUserQuestionsURL           = this.apiURL + "Get_user_questions";
    static getAgreementsURL              = this.apiURL + "GetAgreements";
    static recoverPasswordURL            = this.apiURL + "Recover_password";
    static getAnswersByQuestionIdURL     = this.apiURL + "Get_answers_by_questionid";
    static getQuestionAnamnesURL         = this.apiURL + "Get_question_anamnes";
    static getPatientCardURL             = this.apiURL + "Get_patient_card";
    static closeQuestionURL              = this.apiURL + "Close_question";
    static addReviewURL                  = this.apiURL + "Add_review";
    static SaveDeviceToken               = this.apiURL + "SaveDeviceToken"
    static signInVK                  = this.apiURL + "Sign_vk";

    static imageURL = this.baseURL + "u/i/";
    static uploaderAnalysisURL = this.baseURL + "uploader?key=analysis";

    static agreement2URL = this.baseURL + "agreement/2/";
    static agreement3URL = this.baseURL + "agreement/3/";

}

export default Routes;
