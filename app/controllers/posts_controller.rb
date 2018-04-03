class PostsController < ApplicationController
  def index
  end

  def push
    # debugger
    Webpush.payload_send(
      endpoint: params[:subscription][:endpoint],
      message: "A message",
      p256dh: params[:subscription][:keys][:p256dh],
      auth: params[:subscription][:keys][:auth],
      api_key: "AIzaSyD6wWEBzqbC_OmlYf2qGM08Jw0fXLdy9Fg",
    )
  end
end
