class V1::ApiController < ApplicationController
    helper_method :valid_number?

    def index
        message = MSG_API_WELCOME
        success = true
        data = {
            :name => MSG_API_VERSION
        }

        response_data = ApiResponse.new(message, success, data);
        render json: response_data, status: STATUS_OK
    end

    def initboard
        board_type = params[:type]
        status = STATUS_OK
        proceed = true
        err_msg  = ""

        if !params.has_key? (:type) || board_type.nil?
            proceed = false
            err_msg = MSG_BOARDTYPE_NOT_FOUND
            status = STATUS_NOTFOUND
        end

        if proceed && !valid_number?(board_type)
            proceed = false
            err_msg = MSG_BOARD_TYPE_NOT_VALID
            status = STATUS_NOTFOUND
        end

        if proceed &&  board_type.to_i <= MIN_WORD_LENGTH
            proceed = false
            err_msg = MSG_BOARD_LENGTH_NOT_VALID
            status = STATUS_NOTFOUND
        end

        if proceed
            board_type = board_type.to_i
            board_data = BOGGLE_DATA_STRING.split("").sample(board_type * board_type).join("")
            message = MSG_GAME_INITIATED
            success = true
            data = {
                :board_data => board_data
            }

            response_data = ApiResponse.new(message, success, data)
        else
            response_data = ApiResponse.new(err_msg, proceed, nil)
        end

        render json: response_data, status: status 
    end

    def processword
        word = params[:word]
        status = STATUS_OK
        can_proceed = true
        err_msg = ""
        response_data = nil

        if !params.has_key? (:word) || word.nil?
            err_msg = MSG_EVALUATION_WORD_NOT_FOUND
            can_proceed = false
            status = STATUS_NOTFOUND
        end

        if can_proceed && word.length < MIN_WORD_LENGTH
            err_msg = MSG_WORD_LENGTH_NOT_VALID
            can_proceed = false
            status = STATUS_NOTFOUND
        end

        if can_proceed
            response = DICTIONARY.include? (word)
            score = 0
            if response == true
                case word.length
                when 3
                    score = 1
                when 4
                    score = 2
                when 5
                    score = 3
                when 6
                    score = 4
                when 7
                    score = 5
                else 
                    score = 11
                end
            end
            message = MSG_EVALUATION_SUCCESS
            success = true
            data = {
                :is_correct => response,
                :score => score
            }

            response_data = ApiResponse.new(message, success, data);
        else
            response_data = ApiResponse.new(err_msg, false, nil)
        end

        render json: response_data, status: status
    end


    def valid_number? (string)
        true if Float(string) rescue false
    end
end