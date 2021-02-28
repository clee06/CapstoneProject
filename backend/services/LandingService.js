class LandingService {
    constructor(knex) {
        this.knex = knex;
    }

    async getInstitutions() {
        console.log("getting institutions for landing page")
        let query = await this.knex
            .select("*")
            .from("institutions")
            .catch((err) => {
                throw new Error(err);
            });
        
        console.log(query);
        return query;
    }

}

module.exports = LandingService;
