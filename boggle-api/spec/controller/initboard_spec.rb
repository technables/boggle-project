require "rails_helper"

describe "[Initiate a new board]", :type=> :request do
    # sampele response
    #     {
    #         "message":"GAME_INITIATED",
    #         "success":true,
    #         "data":{
    #             "board_data":"aexhsrrieciicttn"
    #             }
    #     }
    

    # Test Case 1
    # no board type provided, parameter required

    it "can not submit without board type", :focus =>true do
        get "/v1/api/initboard?type"
        expect(response).to have_http_status(:bad_request)  

        response_body = JSON.parse(response.body)
        expect(response_body["success"]).to eq(false)  

        response_data = response_body["data"]
        expect(response_data).to eq(nil)  
        
    end

    # Test Case 2
    # no board type provided, parameter empty type=

    it "can not submit with empty board type", :focus =>true do
        get "/v1/api/initboard?type="
        expect(response).to have_http_status(:bad_request)  

        response_body = JSON.parse(response.body)
        expect(response_body["success"]).to eq(false)  

        response_data = response_body["data"]
        expect(response_data).to eq(nil)  
        
    end

    # Test Case 3
    # valid board type provided

    it "valid response with random board data should be provided", :focus =>true do
        type = 5
        get "/v1/api/initboard?type=" + type.to_s
        expect(response).to have_http_status(:ok)  

        response_body = JSON.parse(response.body)
        expect(response_body["success"]).to eq(true)  

        response_data = response_body["data"]
        expect(response_data["board_data"].length).to eq(type * type)  
        
    end

    # Test Case 4
    # board type provided with less than 3 value

    it "can not submit with low board type", :focus =>true do
        type = 1
        get "/v1/api/initboard?type=" + type.to_s
        expect(response).to have_http_status(:bad_request)  

        response_body = JSON.parse(response.body)
        expect(response_body["success"]).to eq(false)  

        response_data = response_body["data"]
        expect(response_data).to eq(nil)  
        
    end

    # Test Case 5
    # board type provided invalid board type

    it "can not submit with invalid board type", :focus =>true do
        type = 'asd'
        get "/v1/api/initboard?type=" + type
        expect(response).to have_http_status(:bad_request)  

        response_body = JSON.parse(response.body)
        expect(response_body["success"]).to eq(false)  

        response_data = response_body["data"]
        expect(response_data).to eq(nil)  
        
    end
    
end
