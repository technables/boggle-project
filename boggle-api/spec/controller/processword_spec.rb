require "rails_helper"

describe "[Process Word]", :type => :request do

=begin
        Sample Response
        {
            "message":"MSG_EVALUATION_SUCCESS",
            "success":true,
            "data":{
                "is_correct":true,
                "score":4
            }
        }
=end

    
    # Test Case 1
    # no word provided, parameter required

    it "can not submit without word", :focus =>true do
        get "/v1/api/processword?type"
        expect(response).to have_http_status(:bad_request)  

        response_body = JSON.parse(response.body)
        expect(response_body["success"]).to eq(false)  

        response_data = response_body["data"]
        expect(response_data).to eq(nil)  
        
    end

    # Test Case 2
    # no word provided, parameter empty word=

    it "can not submit with empty word", :focus =>true do
        get "/v1/api/processword?word="
        expect(response).to have_http_status(:bad_request)  

        response_body = JSON.parse(response.body)
        expect(response_body["success"]).to eq(false)  

        response_data = response_body["data"]
        expect(response_data).to eq(nil)  
        
    end

    #Test Case 3
    #valid request

    it "process word and provide score", :focus => true do
        get "/v1/api/processword?word=boggle"
        expect(response).to  have_http_status(:ok)

        response_body = JSON.parse(response.body)
        expect(response_body["success"]).to  eq(true)

        response_data = response_body["data"]

        expect(response_data["is_correct"]).to eq(true)
        expect(response_data["score"]).to eq(4) 
    end

    # Test Case 4
    # less character word

    it "provided word is with lesser character", :focus => true do
        get "/v1/api/processword?word=js"
        expect(response).to have_http_status(:bad_request)  

        response_body = JSON.parse(response.body)
        expect(response_body["success"]).to eq(false)  

        response_data = response_body["data"]
        expect(response_data).to eq(nil)  
    end

    # Test Case 5
    # wrong word

    it "provided wrong word ", :focus => true do
        get "/v1/api/processword?word=asdfg"
        expect(response).to have_http_status(:ok)  

        response_body = JSON.parse(response.body);
        expect(response_body["success"]).to  eq(true)

        response_data = response_body["data"]

        expect(response_data["is_correct"]).to eq(false)
        expect(response_data["score"]).to eq(0) 
    end

    # Test Case 6
    # long word provided but max score can be 11

    it "provided wrong word ", :focus => true do
        get "/v1/api/processword?word=abbreviations"
        expect(response).to have_http_status(:ok)  

        response_body = JSON.parse(response.body);
        expect(response_body["success"]).to  eq(true)

        response_data = response_body["data"]

        expect(response_data["is_correct"]).to eq(true)
        expect(response_data["score"]).to eq(11) 
    end



    
end
