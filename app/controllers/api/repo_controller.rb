module Api
  class RepoController < ApplicationController
    def show
      render json: { data: huboard.repo(params[:user], params[:repo]).fetch }
    end
  end
end
