class Huboard
  class Repo
    include Assignees
    include Labels
    include Issues

    attr_accessor :user, :repo, :connection

    def initialize(user, repo, connection)
      @connection = connection
      @user = user
      @repo = repo
    end

    def gh
      @gh || @connection.repos(@user, @repo)
    end

    def fetch
      {
        owner: @connection.users(@user),
        repo: gh.to_h,
        labels: other_labels.sort_by {|l| l['name'].downcase },
        links: link_labels,
        assignees: assignees,
        milestones: milestones,
      }
    end
  end
end
